import './reset.scss'
import './index.scss'
import SuperHeroesList from "./components/SuperHeroesList";






const App = () => {

    // const {users,isLoading, error} = useAppSelector(state=>state.userReducer)
    // const dispatch = useAppDispatch()
    //
    // useEffect(()=>{
    //   dispatch(fetchUsers())
    // },[])

    return (
        <div>

          {/*{isLoading && <h1>Is loading</h1>}*/}
          {/*{error && <h1>{error}</h1>}*/}

          {/*{users.length  > 0 && JSON.stringify(users)}*/}
            <SuperHeroesList/>
        </div>
    );
};

export default App;
