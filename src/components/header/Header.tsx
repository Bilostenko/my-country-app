// interface HeaderProps {
    
// }
 
const Header = () => {
    return ( 
        <header className="flex justify-between items-center mb-8 bg-blue-500">
           <h1 className="text-white">Where in the world?</h1>
            <h1 className="text-2xl font-extrabold text-white ">Where in the world?</h1>
            <button className="flex items-center gap-2 cursor-pointer text-red-500">Dark mode</button>
        </header>
    );
}

 
export default Header;
