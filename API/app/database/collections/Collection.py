from abc import ABC, abstractmethod



class Collection(ABC):

    @abstractmethod
    def insert():
        pass

    @abstractmethod
    def get_one():
        pass

    @abstractmethod
    def get_all():
        pass

    @abstractmethod
    def get_many():
        pass