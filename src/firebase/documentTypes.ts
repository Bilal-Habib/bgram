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

type PostDocument = {
    id: string,
    caption: string,
    likes: string[],
    comments: string[],
    createdAt: Date,
    createdBy: string,
    imageURL: string
}

export type {UserDocument, PostDocument}