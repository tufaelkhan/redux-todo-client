import { useAppSelector } from "@/redux/hook";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";

const TodoContainer = () => {
  const [priority, setPriority] = useState('')
  // form local
  // const {todos} = useAppSelector((state)=> state.todos)
  // form json placeholder
  const { data: todos, isLoading, isError } = useGetTodosQuery(priority);
  // console.log(todos);
  if (isLoading) {
    return <p>Loading....</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-5">
        <AddTodoModal />
        <TodoFilter priority={priority} setPriority={setPriority} />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl space-y-3 p-[5px]">
        {/* <div className="bg-white p-5 flex justify-center items-center text-center rounded-xl text-2xl font-bold">
            <p>There is no task pending</p>
        </div> */}
        <div className="bg-white p-5 w-full h-full rounded-lg">
          {todos?.data?.map((item) => (
            <TodoCard {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
