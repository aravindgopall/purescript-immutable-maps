module Data.Immutable.Map (Map,
    empty,
    size,
    isMap,
    set,
    get,
    delete,
    deleteAll,
    clear,
    update,
    filter,
    isKeyExists
    ) where

import Data.Maybe

import Prelude (class Functor)

foreign import data Map :: Type -> Type -> Type

foreign import empty :: forall k v. Map k v
foreign import size ::forall k v. Map k v -> Int
foreign import isMap ::forall k v. Map k v -> Boolean
foreign import set :: forall k v. k -> v -> Map k v -> Map k v
foreign import _get :: forall k v. k -> Map k v -> (v -> Maybe v) -> Maybe v -> Maybe v
foreign import delete :: forall k v. k -> Map k v -> Map k v
foreign import deleteAll :: forall k v. Array k -> Map k v -> Map k v
foreign import clear :: forall k v. Map k v -> Map k v
{-- foreign import _update :: forall k v.(v -> v -> v) -> k -> v -> Map k v -> Map k v --}
foreign import _map :: forall k v v1. (v -> v1) -> Map k v -> Map k v1
foreign import filter :: forall k v. (v -> Boolean) -> Map k v -> Map k v
foreign import isKeyExists :: forall k v. k -> Map k v -> Boolean


instance functorForImMap :: Functor (Map k) where
    map = _map

get :: forall k v. k -> Map k v -> Maybe v
get key map = _get key map Just Nothing


--- can be able to delete and update key with the value
update :: forall k v. (v ->Maybe v) -> k -> Map k v -> Map k v
update fn key map = alter (maybe Nothing fn) key map

alter :: forall k v. (Maybe v ->Maybe v) -> k -> Map k v -> Map k v
alter f k m = case f (get k m) of
                Nothing -> delete k m 
                Just val -> set k val m
