import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [messageList, setMessageList] = useState([]);
  const [input,setInput] = useState('');
  const [searchList,setSearchList] = useState([]);
  const [inputSearch,setInputSearch] = useState('')
  useEffect (()=>{
    fetch('https://playground.4geeks.com/todo/users/anh_tu')
            .then(response => response.json())
            .then(data => {
                setMessageList(data.todos);
                setSearchList(data.todos);
            })
  },[])
  const updateList = (newTodo) => {
    setMessageList(newTodo)
    setSearchList(newTodo)
  }
    const addTodo = async() => {
      const response = await fetch ('https://playground.4geeks.com/todo/todos/anh_tu', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
      },
      body: JSON.stringify ({
        label: input,
        is_done: false
    })
      })
      const data = await response.json()
      updateList([...messageList, data]);
      if (inputSearch === '' || data.label.toLowerCase().includes(inputSearch.toLowerCase())) {
        setSearchList([...searchList, data]);
    }
      setInput('')
      console.log(data)
    };
  
    const deleteTodo = async(index) => {
      const taskId = messageList[index].id;
      const response = await fetch (`https://playground.4geeks.com/todo/todos/${taskId}`, {
        method: 'DELETE'}
        )
        const updateTodo = [...messageList];
            updateTodo.splice(index, 1);
            updateList(updateTodo);
      }
     
        const filteredSearch = messageList.filter((item) => {
                return item.label.toLowerCase().includes(inputSearch.toLowerCase())}
        )
    return (
      <div className="app">
        <h1 style={{textAlign:'center'}}>Todo List</h1>
        <div className="task-list-container">
                <div className="task-list">
                    <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e)=>setInput(e.target.value)} 
                        value={input} 
                    />
                    <button className='agregar' onClick={addTodo}>Add</button>
                  

                    <ul>
                        {searchList.map((item, index) => {
                            return (
                                <li key={index}>
                                    {item.label}
                                    <button className="" onClick={() => deleteTodo(index)}>X</button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="task-counter">
                        Todo: {searchList.length}
                    </div>
                    <input
                        type="text"
                        name=""
                        id=""
                        onChange={(e)=>setInputSearch(e.target.value)} 
                        value={inputSearch} 
                    />
                    <button className='  gregar' onClick={addTodo}>Search</button> 
                    {inputSearch && (<ul className="search__list">
          {filteredSearch.map((item,index) => (
            <li key={index} className="search__item">{item.label}</li>
          ))}
        </ul>
       )}   
                </div>
            </div>
      </div>
    );
}

export default App;
