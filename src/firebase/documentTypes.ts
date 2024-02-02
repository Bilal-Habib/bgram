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
    createdAt:number
}

type PostDocument = {
    id: string,
    caption: string,
    likes: string[],
    comments: CommentDocument[],
    createdAt: number,
    createdBy: string,
    imageURL: string
}

type CommentDocument = {
    postId: string,
    comment: string,
    createdBy: string,
    createdAt: number
}

export type {UserDocument, PostDocument, CommentDocument}