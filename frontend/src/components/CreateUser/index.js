// CreateUser.js file
import { useState } from "react";
import { createUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const CreateUser = () => {
	const [username, setUsername] = useState("testing");
	const [email, setEmail] = useState("test@test.io");
	const [password, setPassword] = useState("testing");
	const [images, setImages] = useState(null);
	// for multuple file upload
	//   const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);

	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const handleSubmit = (e) => {
		e.preventDefault();
		let lastName = "test";
		let firstName = "test";
		let newErrors = [];
		dispatch(
			createUser({
				username,
				email,
				password,
				images,
				lastName,
				firstName,
			})
		)
			.then(() => {
				setUsername("");
				setEmail("");
				setPassword("");
				setImages(null);
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					newErrors = data.errors;
					setErrors(newErrors);
				}
			});
	};

	const updateFile = (e) => {
		const file = e.target.files;
		if (file.length !== 5) return setErrors(['Must include five files'])
		else setErrors([])
		if (file) setImages(file);
		console.log(file)
	};

	// for multiple file upload
	//   const updateFiles = (e) => {
	//     const files = e.target.files;
	//     setImages(files);
	//   };

	return (
		<div>
			<h1>AWS S3 Express-React Demo</h1>
			{errors.length > 0 &&
				errors.map((error) => <div key={error}>{error}</div>)}
			<form
				style={{ display: "flex", flexFlow: "column" }}
				onSubmit={handleSubmit}
			>
				<label>
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</label>
				<label>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<label>
					<input type="file" onChange={updateFile} multiple />
				</label>
				{/* <label>
            Multiple Upload
            <input 
              type="file"
              multiple
              onChange={updateFiles} />
          </label> */}
				<button type="submit">Create User</button>
			</form>
			<div>
				{user && (
					<div>
						<h1>{user.username}</h1>
						<img
							style={{ width: "150px" }}
							src={user.profileImageUrl}
							alt="profile"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default CreateUser;
