import { useEffect, useState } from 'react'

// prefixes the key with this prefix value so that when working on localhost 3000 which we probably have tons of local storage variable stored in, it'll be easy to see which ones are correseponding with our exact app 
const PREFIX = 'front-code'

//the key that we want to use in local storage and initial value is just our generic initial value just same as in useStates
export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX+key;

    //here we are using the function version of useState bcz getting our value from local storage is slow, so we only do that once if we have to
    const[value, setValue] = useState(()=>{
        const jsonValue = localStorage.getItem(prefixedKey)  //getting json value from local storage

        if(jsonValue != null)
        return JSON.parse(jsonValue)

        if(typeof initialValue ==='function'){
            return initialValue()
        }
        else{
            return initialValue
        }   
    })

    useEffect(()=>{
        localStorage.setItem(prefixedKey, JSON.stringify(value))  //stores the updated  value in local storage upon getting the value from above if else blocks
    }, [prefixedKey, value])
  return [ value, setValue]
  
}
