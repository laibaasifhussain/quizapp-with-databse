import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
import { getDatabase,ref,set,onValue, push } from "firebase/database";
import {app} from './firebaseconfig';

let auth = getAuth(app)
let db = getDatabase(app)


export let fbLogin=(body)=>{
    return new Promise((resolve,reject)=>{
        if(!body.email || !body.password){
            reject("Email and Password is Required")
        }else{
            signInWithEmailAndPassword(auth,body.email,body.password).then(res=>{
                let id = res.user.uid
                
                const referece = ref(db,`users/${id}`)
            
                onValue(referece,(data)=>{
                    if(data.exists()){
                        resolve(data.val())
                    }else{
                        reject("No Data Found")
                    }
                } )
            
            }).catch(err=>{
                reject(err)
            })
        }
    })
}

export let fbSignUp=(body)=>{
    return new Promise((resolve,reject)=>{
        if(!body.email || !body.password){
            reject("Email and Password is Required")
        }else{
            createUserWithEmailAndPassword(auth,body.email,body.password).then(res=>{
                let id = res.user.uid
                
                body.id = id
                const referece = ref(db,`users/${id}`)
                set(referece,body).then(user=>{
                    resolve("User Created Succefully")
                }).catch(error=>{
                    reject(error)
                })
            
            }).catch(err=>{
                reject(err)
            })
        }
    })

}

export let fbAdd =(nodeName,body, id) =>{
    return new Promise((resolve,reject)=>{

        const questionId = push(ref(db, `${nodeName}/`)).key
        body.id = questionId;
        const referece =  ref(db, `${nodeName}/${id?id:''}`)
        set(referece,body).then(res=>{
            resolve("Data Send succesfully")
        }).catch(err=>{
            reject(err)
        })
})
}


export let fbGet=(nodeName,id)=>{
    return new Promise((resolve,reject)=>{
        const referece = ref(db,`${nodeName}/${id?id:''}`)
        onValue(referece,(data)=>{
            if(data.exists()){
                resolve(Object.values(data.val()))
            }
            else{
                reject("No data found :(")
            }
            })
        })
}