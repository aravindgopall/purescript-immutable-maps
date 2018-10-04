module Main where

import Prelude

import Data.Immutable.Map (empty, get, set, update)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Console (log)

main :: Effect Unit
main = do
  let map1 = empty
      map2 = set "key" 1 map1
      map3 = update (\val -> Just val)  "key" map2
      map4 = update (\val -> Nothing) "key" map2
      {-- map4 = map (\val -> val *10) map3 --}
  log $ show $ get "key" map3
  log $ show $ get "key" map4
  log "Hello sailor!"
