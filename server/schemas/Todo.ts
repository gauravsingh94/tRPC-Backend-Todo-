import mongoose,{Document,Model,Types} from "mongoose";

export interface TodoType extends Document{
    title: string,
    description:string
}

const todoSchema = new mongoose.Schema({
    title: {type:String,require:true},
    description:{type:String}
})

export const Todo:Model<TodoType> = mongoose.model<TodoType>("Todo",todoSchema);
