import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppDispatch } from "@/redux/hook";
import { addTodo } from "@/redux/features/todoSlice";
import { useAddTodosMutation } from "@/redux/api/api";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";


const AddTodoModal = () => {
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('')

    // for local state
    // const dispatch = useAppDispatch()
    
    // for server
    const [ addTodo, { data, isLoading, isError, isSuccess}] = useAddTodosMutation();
    // console.log({data, isLoading, isError, isSuccess});

    const onSubmit = (e:FormEvent) => {
        e.preventDefault();
        // const randomString = Math.random().toString(36).substring(2, 7)
        const taskDetails = {
            // id: randomString,
            title: task,
            description,
            isCompleted: false,
            priority,
        }
        // for local
        // console.log(taskDetails);
        // dispatch(addTodo(taskDetails))
        // console.log({task, description});

        // for server
        // console.log('ainside modal',taskDetails);
        addTodo(taskDetails)
    }

    return (
        <Dialog>
      <DialogTrigger asChild>
      <Button className="bg-primary-gradient text-xl font-semibold">Add Todo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
      <form onSubmit={onSubmit}>
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add your task that you want to finish.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task" className="text-right">
             Task
            </Label>
            <Input onBlur={(e)=> setTask(e.target.value)} id="task" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input onBlur={(e)=> setDescription(e.target.value)} id="description" className="col-span-3" />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">
              Priority
            </Label>
            <Select onValueChange={(value) => setPriority(value)}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Select a Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
        </div>
        <div className="flex justify-end">
            <DialogClose asChild>
          <Button type="submit">Save changes</Button>
            </DialogClose>
        </div>
      </form>
      </DialogContent>
    </Dialog>
    );
};

export default AddTodoModal;