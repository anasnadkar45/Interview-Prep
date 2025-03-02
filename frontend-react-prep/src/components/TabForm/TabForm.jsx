import React, { useState } from 'react'

const config = [
    {
        id: 1,
        tabName: 'Profile',
        component: Profile
    },
    {
        id: 2,
        tabName: 'Interest',
        component: Interest
    },
    {
        id: 3,
        tabName: 'Settings',
        component: Settings
    },
]

function Profile({ formData, setFormData }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, // Correctly updating the state
        }));
    };

    return (
        <form>
            <div>
                <label>Age</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}


function Interest({ formData, setFormData }) {
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            interest: e.target.value,
        }));
    };

    return (
        <form>
            <label>Interest</label>
            <input type="text" name="interest" value={formData.interest} onChange={handleChange} />
        </form>
    );
}

function Settings({ formData, setFormData }) {
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            notificationType: e.target.value,
        }));
    };

    return (
        <form>
            <label>Notification Type</label>
            <input type="text" name="notificationType" value={formData.notificationType} onChange={handleChange} />
        </form>
    );
}

export const TabForm = () => {
    const [formData, setFormData] = useState({
        age: 0,
        email: '',
        interest: '',
        isSubscribed: false,
        notificationType: ''
    })

    const [activeTab, setActiveTab] = useState(config[0])
    let Component = activeTab.component;
    return (
        <div>
            <h2>TabForm</h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                {config.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            backgroundColor: activeTab.tabName === tab.tabName ? "blue" : "gray",
                            color: "white",
                            padding: "10px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {tab.tabName}
                    </button>
                ))}
            </div>

            {activeTab && <Component formData={formData} setFormData={setFormData} />}
        </div>
    )
}
