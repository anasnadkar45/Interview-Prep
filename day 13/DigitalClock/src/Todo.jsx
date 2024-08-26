import { useEffect, useState } from "react";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [isAtoZ, setIsAtoZ] = useState(false);
    const [editableTodo, setEditableTodo] = useState(null);
    const [editInput, setEditInput] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [debounceSearchInput, setDebounceSearchInput] = useState('');
    
    const fetchTodos = async () => {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data = await response.json();
        setTodos(data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const AddTodoHandler = (e) => {
        let id = Date.now();
        e.preventDefault();
        if (input.length > 0) {
            setTodos([
                ...todos,
                {
                    id: id,
                    title: input,
                    completed: false,
                },
            ]);
        }
        setInput("");
    };

    const sortedTodos = [...todos].sort((a, b) => {
        if (isAtoZ) {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    const editTodoHandler = (id) => {
        setEditableTodo(id);
        const todo = todos.find(todo => todo.id === id);
        setEditInput(todo.title);
    };

    const saveEditedTodoHandler = (id) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? {
                ...todo,
                title: editInput,
            } : todo
        ))
        setEditableTodo(null);
    }

    useEffect(()=>{
        let timer = setTimeout(()=>{
            setDebounceSearchInput(searchInput);
        },1000)
        return () => clearTimeout(timer)
    },[searchInput]);

    const debouncedSortedTodos = sortedTodos.filter((todo) =>{
        return todo.title.toLowerCase().includes(debounceSearchInput.toLocaleLowerCase());
    })

    return (
        <div className="w-fit mx-auto mt-8 space-y-2">
            <form onSubmit={AddTodoHandler}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a todo"
                />
                <button type="submit">Add Todo</button>
            </form>
            <button onClick={() => setIsAtoZ(true)}>A-Z</button>
            <button onClick={() => setIsAtoZ(false)}>Z-A</button>
            <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search todos"
            />
            <ul>
                {debouncedSortedTodos.map((todo) => (
                    <li key={todo.id}>
                        {
                            editableTodo === todo.id ? (
                                <div >
                                    <input type="text" onChange={(e) => setEditInput(e.target.value)} value={editInput} />
                                    <button onClick={() => saveEditedTodoHandler(todo.id)}>Save</button>
                                </div>
                            ) : (
                                <div onClick={() => editTodoHandler(todo.id)}>
                                    <p>{todo.title}</p>
                                </div>
                            )
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
}
