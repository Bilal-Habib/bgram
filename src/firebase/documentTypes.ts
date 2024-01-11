import React from 'react'

type UserDocument = {
    uid:string,
    email:string,
    fullName:string,
    username:string,
    password:string,
    bio:string,
    profilePicUrl:string,
    followers:string[],
    following:string[],
    posts:string[],
    createdAt:Date
}

export type {UserDocument}