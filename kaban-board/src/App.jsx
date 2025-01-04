import React, { useState } from 'react';
import { GrAdd } from 'react-icons/gr';
import { IoAdd } from 'react-icons/io5';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: '',
    description: '',
  });
  const [categories, setCategories] = useState([]);
  const [categoryDetails, setCategoryDetails] = useState({
    id: Date.now(),
    title: '',
  });
  const [toggelCategory, setToggelCategory] = useState(false);
  const [taskModal, setTaskModal] = useState({}); // Stores modal state for each category

  // Handle Add Category
  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategories([...categories, { id: Date.now(), title: categoryDetails.title }]);
    setCategoryDetails({ id: Date.now(), title: '' });
    setToggelCategory(false);
  };

  // Handle Category Input Change
  const handleCategoryDetails = (e) => {
    const { name, value } = e.target;
    setCategoryDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle Task Input Change
  const handleTaskDetails = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle Add Task
  const handleAddTask = (categoryId) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: taskDetails.title,
        description: taskDetails.description,
        categoryId,
      },
    ]);
    setTaskDetails({ title: '', description: '' });
    setTaskModal((prev) => ({ ...prev, [categoryId]: false }));
  };

  return (
    <div style={{ position: 'relative', display: 'flex', gap: '15px', padding: '10px' }}>
      {/* Categories Section */}
      {categories.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px',
            border: '1px solid black',
            borderRadius: '10px',
            padding: '10px',
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              style={{
                backgroundColor: 'lightgray',
                padding: '10px',
                minWidth: '200px',
                borderRadius: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>{category.title}</p>
                <button onClick={() => setTaskModal({ ...taskModal, [category.id]: true })}>
                  <IoAdd />
                </button>
              </div>

              {/* Tasks */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {tasks
                  .filter((task) => task.categoryId === category.id)
                  .map((task) => (
                    <div key={task.id} style={{ border: '1px solid gray', padding: '5px', borderRadius: '5px', backgroundColor:'white' }}>
                      <h2>{task.title}</h2>
                      <p>{task.description}</p>
                    </div>
                  ))}
              </div>

              {/* Task Modal */}
              {taskModal[category.id] && (
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      width: '400px',
                      padding: '24px',
                      position: 'relative',
                    }}
                  >
                    {/* Modal Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '16px',
                      }}
                    >
                      <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Add New Task</h2>
                      <button
                        onClick={() => setTaskModal({ ...taskModal, [category.id]: false })}
                        style={{ color: '#6b7280', fontSize: '1.25rem', cursor: 'pointer' }}
                      >
                        &times;
                      </button>
                    </div>

                    {/* Modal Form */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddTask(category.id);
                      }}
                      style={{ marginTop: '16px' }}
                    >
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '500' }}>Title</label>
                        <input
                          type="text"
                          name="title"
                          value={taskDetails.title}
                          onChange={handleTaskDetails}
                          placeholder="Enter task title"
                          style={{ padding: '8px', width: '100%', border: '1px solid #ddd' }}
                        />
                      </div>
                      <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', fontWeight: '500' }}>Description</label>
                        <textarea
                          name="description"
                          value={taskDetails.description}
                          onChange={handleTaskDetails}
                          placeholder="Enter task description"
                          style={{ padding: '8px', width: '100%', border: '1px solid #ddd' }}
                        />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                        <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white' }}>
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add Category Button */}
      <button style={{height:'40px'}} onClick={() => setToggelCategory(!toggelCategory)}>
        <GrAdd />
      </button>

      {toggelCategory && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '400px', padding: '24px', position: 'relative' }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', paddingBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Add New Category</h2>
              <button
                onClick={() => setToggelCategory(false)}
                style={{ color: '#6b7280', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                &times;
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddCategory} style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '4px' }}>Title</label>
                <input
                  type="text"
                  name="title"
                  value={categoryDetails.title}
                  onChange={handleCategoryDetails}
                  placeholder="Enter category title"
                  style={{ padding: '8px', width: '100%', border: '1px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setToggelCategory(false)}
                  style={{ padding: '8px 16px', backgroundColor: '#e5e7eb', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
