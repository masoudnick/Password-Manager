
import logo from "../assets/images/logo.svg";


const Sidebar = () =>{
    return (
        <aside className="mt-4">
            <div>
                <img src={logo} alt="Logo" width="24px" />
                <h1>Password Manager</h1>
            </div>
        </aside>
    )
}


export default Sidebar;