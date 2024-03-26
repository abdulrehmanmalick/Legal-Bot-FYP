import os
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
# from langchain.chat_models import AzureChatOpenAI
from langchain.embeddings.openai import OpenAIEmbeddings

# from langchain.vectorstores import FAISS
from langchain_community.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.chains import ConversationalRetrievalChain
# from langchain.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
# from langchain.document_loaders import PyPDFLoader
from langchain_community.document_loaders import PyPDFLoader
from langchain.prompts import PromptTemplate
from langchain.chains.conversation.memory import ConversationBufferMemory
from langchain.globals import set_debug
from torch import cuda, bfloat16
# from google.colab import userdata
import transformers
import pickle

set_debug(False)

os.environ["HF_KEY"] = os.environ['HF_KEY']

model_id = 'NousResearch/Llama-2-7b-hf'

device = f'cuda:{cuda.current_device()}' if cuda.is_available() else 'cpu'

# set quantization configuration to load large model with less GPU memory
# this requires the `bitsandbytes` library
bnb_config = transformers.BitsAndBytesConfig(
    load_in_8bit=True,
    bnb_4bit_quant_type='nf4',
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=bfloat16
)

# begin initializing HF items, need auth token for these
hf_auth = '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'
model_config = transformers.AutoConfig.from_pretrained(
    model_id,
    use_auth_token=hf_auth
)

model = transformers.AutoModelForCausalLM.from_pretrained(
    model_id,
    trust_remote_code=True,
    config=model_config,
    quantization_config=bnb_config,
    device_map='auto',
    use_auth_token=hf_auth
)
model.eval()
print(f"Model loaded on {device}")

tokenizer = transformers.AutoTokenizer.from_pretrained(
    model_id,
    use_auth_token=hf_auth
)

generate_text = transformers.pipeline(
    model=model, tokenizer=tokenizer,
    return_full_text=True,  # langchain expects the full text
    task='text-generation',
    # we pass model parameters here too
    temperature=1,  # 'randomness' of outputs, 0.0 is the min and 1.0 the max
    max_new_tokens=512,  # mex number of tokens to generate in the output
    repetition_penalty=1.1  # without this output begins repeating
)

def split_text_file(filepath):
    with open(filepath, 'r') as file:
        text = file.read()
    words = text.split()
    chunks = []
    index = 0
    overlap = 50
    chunk_size = 256
    while index < len(words):
        if index > 0:
            start_index = index - overlap
        else:
            start_index = index
        end_index = start_index + chunk_size
        current_chunk = words[start_index:end_index]
        chunks.append(' '.join(current_chunk))
        index = end_index
    return chunks

#******************************************************************************************************
class chat_gen():
    def __init__(self):
        self.chat_history=[]
        self.chain = self.load_model()


    def load_doc(self,document_path):
        embeddings = HuggingFaceEmbeddings(model_name='sentence-transformers/all-MiniLM-L6-v2')

        if not os.path.exists("faiss_index_datamodel"):
          file_path = "static/data/corplaw.txt"
          text_splitter = CharacterTextSplitter(chunk_size=512, chunk_overlap=30, separator="\n")
          docs = text_splitter.create_documents(split_text_file(file_path))
          vectorstore = FAISS.from_documents(docs, embeddings)
          vectorstore.save_local("faiss_index_datamodel")
        persisted_vectorstore = FAISS.load_local("faiss_index_datamodel", embeddings, allow_dangerous_deserialization=True)
        return persisted_vectorstore



    def load_model(self):
        from langchain_community.llms.huggingface_pipeline import HuggingFacePipeline
        # generate_text = get_model()
        llm = HuggingFacePipeline(pipeline=generate_text)
        system_instruction = """[INST] <<SYS>>As an AI Legal assistant, you must answer the query from the user from the retrieved content,
        if no relavant information is available, answer the question by using your knowledge about the topic<</SYS>>"""
        template = (
            f"{system_instruction} "
            "Combine the chat history{chat_history} and follow up question into "
            "a standalone question to answer from the {context}. "
            "Follow up question: {question}[/INST]\nAnswer:"
        )

        prompt = PromptTemplate.from_template(template)
        retriever = self.load_doc("cropped.pdf").as_retriever(search_kwargs={"k": 1})
        chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=retriever,
            #condense_question_prompt=prompt,
            combine_docs_chain_kwargs={'prompt': prompt},
            chain_type="stuff",
        )
        return chain

    def ask_pdf(self,query):
        model = self.chain
        result = model.invoke({"question":query,"chat_history": self.chat_history})
        self.chat_history.append((query, result["answer"]))
        return result['answer']
#******************************************************************************************************

class ChatModel(chat_gen):
    def __init__(self, custom_model:bool = False):
        super().__init__()
        self.model = None

    def create_model(
            self,
            persist_dir:str, 
            model_text_path:str, 
            model_name:str,
        ):
        pass
        # print("```````````````````````````````````````````````\creating Model...\n```````````````````````````````````````````````")
        # persist_directory = persist_dir

        # # loader = TextLoader(model_text_path , encoding='utf-8')
        # # documents = loader.load()

        # # text_splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=10)
        # # texts = text_splitter.split_documents(documents)

        # embeddings = OpenAIEmbeddings()
        # vectordb = Chroma.from_documents(documents=generate_text, embedding=embeddings, persist_directory=persist_directory)
        # vectordb.persist()

        # retriever = vectordb.as_retriever(search_kwargs={"k": 3})
        # llm = ChatOpenAI(model_name=model_name)

        # self.model = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
        # print("```````````````````````````````````````````````\nModel Loaded!\n```````````````````````````````````````````````")

        # return self.model
    
#     def get_model(self):
#         return self.model
    
#     def _save_model(self, retriever, filename: str) -> None:
#         with open(filename, 'wb') as f:
#             pickle.dump(retriever, f, pickle.HIGHEST_PROTOCOL)

#     def _load_retriever(self, filename: str):
#         with open(filename, 'rb') as f:
#             retriever = pickle.load(f)

#             return retriever
        
#     def load_model(self, model_name, persist_directory):
#         vectordb = Chroma(persist_directory=persist_directory, embedding_function=OpenAIEmbeddings())
#         retriever = vectordb.as_retriever()

#         llm = ChatOpenAI(model_name=model_name)

#         self.model = RetrievalQA.from_chain_type(llm=llm, chain_type="stuff", retriever=retriever)
#         print("```````````````````````````````````````````````\nModel Loaded! \n```````````````````````````````````````````````")        

    def make_chat(self, prompt:str) -> str:

        # if self.model == None:
        #     return "Please wait while the model is loading..."

        # if not prompt or prompt == "":
        #     raise Exception("No prompt given.")

        # query = query = f"###Prompt {prompt}"
        # model_response = self.model(query)

        # return model_response

        return self.ask_pdf(prompt)
