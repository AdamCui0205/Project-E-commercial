const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter your password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;