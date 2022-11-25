import "../App.css"
const Table = ({personDetails:{name,email}}) => {
    // console.log(email,name)


return(
    <div>
        <table className="table">
            <tr>
                <td>{name}</td>
                <td>{email}</td>
            </tr>
            
        </table>
    </div>
)
}
export default Table

