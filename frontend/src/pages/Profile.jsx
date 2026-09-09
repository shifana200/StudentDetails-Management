import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  

  
    const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('studentToken');

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/student/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStudent(data);
        setFormData(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };


//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('studentToken');


//       const form = new FormData();
//       form.append('name', formData.name.trim());
//       form.append('age', formData.age);
//       form.append('class', formData.class);

//       if ( imageFile) form.append('profilePic', imageFile);


//       await axios.put('http://localhost:5000/api/student/profile', form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       const { data } = await axios.get('http://localhost:5000/api/student/profile', form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
          
//         },
//       });

//       setStudent(data);
//       setFormData({
//         name: data.name,
//         age: data.age,
//         class: data.class,
//         email: data.email,
//         admissionNumber: data.admissionNumber,
//         profilePic: data.profilePic || data.profileImage,
//       });
//       setEditing(false);
//       setImageFile(null);
//       setError('');
//     } catch (err) {
//         console.error("Update error:", err);
//         setError('Failed to update profile');
//     }
//   };

const navigate = useNavigate(); 
const handleLogout = () => {
  localStorage.removeItem('studentToken'); // remove auth token
  navigate('/'); // redirect to login or home
};


const handleSave = async () => {
    try {
      const token = localStorage.getItem('studentToken');
      const form = new FormData();
      form.append('name', formData.name);
      form.append('age', formData.age);
      form.append('class', formData.class);
      if (imageFile) form.append('profilePic', imageFile);
  
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/student/profile`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // ✅ Update both states so the new values are shown immediately
      setStudent((prev) => ({
        ...prev,
        ...formData,
        profilePic: imageFile ? data.student.profilePic : prev.profilePic,
      }));
  
      setFormData((prev) => ({
        ...prev,
        ...formData,
      }));
  
      setEditing(false);
      setImageFile(null);
      setError('');
    } catch (err) {
      console.error("Update error:", err);
      setError('Failed to update profile');
    }
  };
  




  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <div>
//       <h2>Student Profile</h2>
//       <img 
//         src={`http://localhost:5000/uploads/${student.profilePic}`} 
//         alt="Profile" 
//         width="150"
//         style={{ borderRadius: '50%' }}
//       />

// {!editing ? (
//         <div>
//           <p><strong>Name:</strong> {student.name}</p>
//           <p><strong>Age:</strong> {student.age}</p>
//           <p><strong>Class:</strong> {student.class}</p>
//           <p><strong>Admission Number:</strong> {student.admissionNumber}</p>
//           <p><strong>Email:</strong> {student.email}</p>
//           <button onClick={() => setEditing(true)}>Edit</button>
//         </div>
//       ) : (
//         <div>
//           <label>
//             Name:
//             <input type="text" name="name" value={formData.name || ''} onChange={handleChange} />
//           </label>
//           <br />
//           <label>
//             Age:
//             <input type="number" name="age" value={formData.age || ''} onChange={handleChange} />
//           </label>
//           <br />
//           <label>
//             Class:
//             <input type="text" name="class" value={formData.class || ''} onChange={handleChange} />
//           </label>
//           <br />
//           <label>
//             Admission Number:
//             <input type="text" value={formData.admissionNumber} disabled />
//           </label>
//           <br />
//           <label>
//             Email:
//             <input type="email" value={formData.email} disabled />
//           </label>
//           <br />
//           <label>
//             Change Profile Picture:
//             <input type="file" onChange={handleImageChange} />
//           </label>
//           <br />
//           <button onClick={handleSave}>Save</button>
//           <button onClick={() => setEditing(false)}>Cancel</button>
//         </div>
//       )}




    
//     </div>
//   );

return (
  <div style={{
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: 'Arial, sans-serif',
  }}>
    <h2 style={{
      textAlign: 'center',
      marginBottom: '24px',
      fontSize: '28px',
      color: '#333',
    }}>
      Student Profile
    </h2>

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
      <img
        src={`${import.meta.env.VITE_API_URL}/uploads/${student.profilePic}`}
        alt="Profile"
        width="150"
        height="150"
        style={{
          borderRadius: '12px',
          objectFit: 'cover',
        }}
      />
    </div>

    {!editing ? (
      <div style={{ lineHeight: '2' }}>
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Age:</strong> {student.age}</p>
        <p><strong>Class:</strong> {student.class}</p>
        <p><strong>Admission Number:</strong> {student.admissionNumber}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <button
          onClick={() => setEditing(true)}
          style={{
            marginTop: '12px',
            padding: '10px 16px',
            backgroundColor: '#3b82f6',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Edit
        </button>
        <button
       onClick={handleLogout} // make sure you define this function
    style={{
      padding: '10px 16px',
      backgroundColor: '#ef4444', // red
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      marginLeft:'3px',
    }}
  >
    Logout
  </button>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          Class:
          <input
            type="text"
            name="class"
            value={formData.class || ''}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          Admission Number:
          <input
            type="text"
            value={formData.admissionNumber}
            disabled
            style={{ ...inputStyle, backgroundColor: '#f3f4f6' }}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            disabled
            style={{ ...inputStyle, backgroundColor: '#f3f4f6' }}
          />
        </label>

        <label>
          Change Profile Picture:
          <input type="file" onChange={handleImageChange} />
        </label>

        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              padding: '10px 16px',
              backgroundColor: '#10b981', // green
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Save
          </button>
          <button
            onClick={() => setEditing(false)}
            style={{
              padding: '10px 16px',
              backgroundColor: '#ef4444', // red
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          
        </div>
      </div>
    )}
  </div>
);
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '4px',
};

export default Profile;
