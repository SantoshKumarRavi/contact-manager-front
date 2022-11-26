import ReactTooltip from 'react-tooltip';
import "../App.css"
const Table = ({ personDetails: { name, email } }) => {
  // console.log(email,name)


  return (
    <div>
      <table className="table">
        <tr>
          <td>{name}</td>
          <td  className='tip' data-for='tool' data-tip={email}>{email}</td>
          <ReactTooltip  place='bottom' id='tool'/>
        </tr>

      </table>
    </div>
  )
}
export default Table

