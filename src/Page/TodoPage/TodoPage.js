import React, { useState } from 'react';
import Header from '../../Layouts/Header/Header';
import Modal from '../../Component/Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { todoLists } from '../../redux/features/todo/todoList';
import CustomButton from '../../Component/CustomButton/CustomButton';
import ListBox from '../../Component/ListBox/ListBox';
import { BsPlusLg } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import './ToDoPage.scss';
import { createToDoList } from '../../redux/features/todo/todoList';

export default function TodoPage() {

  const dispatch = useDispatch()
  const allTodoLists = useSelector(todoLists);

  // Modal 
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };
  // End modal

  const [todo, setTodo] = useState({
    name: '',
    id: ''
  })

  const handleInput = (event) => {
    const newTodo = {...todo, name: event.target.value}
    setTodo(newTodo)
  }

  const createNewTodo = async () => {
    const newTodo = {...todo};
    newTodo.id = await getNewId();
    dispatch(createToDoList(newTodo))
    toggleModal()
  }

  const getNewId = () => {
    const newList = [...allTodoLists]
    return newList.pop().id + 1
  }

  

  return (
    <>
      <Header />
      <main className='todo-page'>
        {
          // Create a TODO modal
          modal && (
            <Modal>
              <div className='todo__create'>
                <div className='todo__create__header'>
                  <h3>Créer une nouvelle Todo ?</h3>
                  <CustomButton
                    txt={<GrClose />}
                    class='todo-page__close-btn simple-button round'
                    handleClick={toggleModal}
                    label='Fermer la fenêtre de création de ToDo'
                  />
                </div>
                <label htmlFor=''>Titre</label>
                <input type='text' id='todo-create__input' onInput={(event) => handleInput(event)} value={todo.name}/>
                <div className='todo__create__send-div'>
                  <CustomButton
                    txt={'Créer'}
                    class='todo__create__send-btn simple-button'
                    handleClick={createNewTodo}
                    label='Créer une todo'
                  />
                </div>
              </div>
            </Modal>
            // END of Create a TODO modal
          )
        }
        <div className='todo-page__header'>
          <h1>Mes TODO</h1>
          <CustomButton
            txt={<BsPlusLg />}
            class='todo-page__add-btn simple-button round'
            handleClick={toggleModal}
            label='Ouvrir la fenêtre de création de ToDo'
          />
        </div>
        {allTodoLists.map((list) => {
          return <ListBox key={list.id} {...list} />;
        })}
      </main>
    </>
  );
}
