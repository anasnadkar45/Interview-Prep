import React, { useEffect, useState } from 'react'

const Table = () => {
    const [data, setData] = useState([]);
    const [active, setActive] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        username: '',
    });
    const [edit, setEdit] = useState([]);

    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const result = await response.json();
        setData(result);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const AddUser = () => {
        setActive(!active);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let id = new Date
        setData([...data, {
            id: id.getTime(),
            ...newUser
        }]);

        setNewUser({
            name: '',
            username: '',
        })

        setActive(false)

    }

    const handleCheckbox = (id, isChecked) => {
        const existingItem = edit.filter(item => item.id === id)
        if (existingItem.length > 0) {
            let newEditArr = edit.filter(item => item.id !== id)
            setEdit(newEditArr);
        } else {
            setEdit((prevEfit) => ([
                ...prevEfit,
                { id: id, isChecked: isChecked }
            ]))
        }
    }

    const deleteHandler = () => {
        const idsToDelete = edit.map(item => item.id);
        const newData = data.filter((dataItem) => !idsToDelete.includes(dataItem.id));
        setData(newData);
        setEdit([]);
    }
    console.log(data);
    return (
        <div className='space-y-4'>
            <div className='flex justify-between'>
                <input type="text" placeholder='search' />
                <div>
                    {edit.length > 0 && <button onClick={deleteHandler}>Delete</button>}
                    <button onClick={AddUser}>Add User</button>
                </div>
            </div>

            <table className='w-full border rounded-md'>
                <thead>
                    <tr>
                        <input type="checkbox" />
                        <th>Id</th>
                        <th>Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className='border-b'>
                            <input type="checkbox" onChange={(e) => handleCheckbox(item.id, e.target.checked)} />
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {active && <div className='inset-0 fixed bg-black/60 w-full flex justify-center items-center'>
                <form className='bg-white w-[60%] flex flex-col justify-center items-center gap-4 p-4 rounded-md'>
                    <input type="text" name='name' onChange={handleInputChange} value={newUser.name} placeholder='name' className='border-b bg-black ' />
                    <input type="text" name='username' onChange={handleInputChange} value={newUser.username} placeholder='username' className='border-b bg-black ' />
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={AddUser}>Cancle</button>
                </form>
            </div>}
        </div>
    )
}

export default Table