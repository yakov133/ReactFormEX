import style from "../Css/table.module.css";


const Table = ({value,setValue}) => {
  
  const NewLine = (e)=>{
    e.preventDefault();
    setValue({...value,table:[...value.table,[0,0]]})
  }
  
  const updatePriceAndQuantity =(index,item, inputValue)=>{
    let tempTable = [...value.table];
    if(item === "price"){
        tempTable[index][0]=inputValue;
    }else{
        tempTable[index][1]=inputValue;
    }
    setValue({...value,table:tempTable})

  }

  return (
    <div >
      <table className={style.table}>
        <thead>
          <tr>
            <th>Number:</th>
            <th>Price:</th>
            <th>Quantity:</th>
            <th>Sum:</th>
          </tr>
        </thead>
        <tbody>
          {value.table.map((arr, i) => {
            return (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <input type="number" defaultValue={arr[0]} name="price" 
                  onChange={(e)=>updatePriceAndQuantity(i,"price",e.target.value)}/>
                </td>

                <td>
                  <input type="number" defaultValue={arr[1]} name="quantity" 
                  onChange={(e)=>updatePriceAndQuantity(i,"quantity",e.target.value)}/>
                </td>
                <td>{arr[0] * arr[1]  + '\t₪' }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={NewLine}>+ Add new Line</button>
    </div>
  );
};
export default Table;
