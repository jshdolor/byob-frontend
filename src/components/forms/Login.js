const LoginForm = () => (
    <form>
        <div className='form-group'>
            <input
                className='form-control'
                placeholder='Username / Email'
            ></input>
        </div>
        <div className='form-group'>
            <input
                className='form-control'
                placeholder='Password'
                type='password'
            ></input>
        </div>
        <div className='form-group'>
            <button className='btn btn-primary btn-block'>Login</button>
        </div>
    </form>
);

export default LoginForm;
