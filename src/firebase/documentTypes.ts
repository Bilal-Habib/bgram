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
    comments: CommentDocument[],
    createdAt: Date,
    createdBy: string,
    imageURL: string
}

type CommentDocument = {
    postId: string,
    comment: string,
    createdBy: string,
    createdAt: Date
}

export type {UserDocument, PostDocument, CommentDocument}