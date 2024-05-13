import { useLogin } from '../hooks/useLogin';
import { useState } from 'react';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login, isLoading, error } = useLogin();

	const check = (text) => {
		console.log(text);
		setUsername(text);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		await login(username, password);
	};

	return (
		<div className="hold-transition login-page">
			<div className="login-box">
				{/* /.login-logo */}
				<div className="card">
					<div className="card-body login-card-body">
						<p className="login-box-msg">Đăng nhập</p>
						<form onSubmit={handleSubmit}>
							<div className="input-group mb-3">
								<input
									type="text"
									className="form-control"
									placeholder="username"
									onChange={(e) => check(e.target.value)}
									value={username}
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-envelope" />
									</div>
								</div>
							</div>
							<div className="input-group mb-3">
								<input
									type="password"
									className="form-control"
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
								/>
								<div className="input-group-append">
									<div className="input-group-text">
										<span className="fas fa-lock" />
									</div>
								</div>
							</div>
							<div className="row">
								{/* /.col */}
								<div className="col-5">
									<button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
										Đăng nhập
									</button>
								</div>
								{/* /.col */}
								{error && <div className="error">{error}</div>}
							</div>
						</form>
					</div>
					{/* /.login-card-body */}
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
