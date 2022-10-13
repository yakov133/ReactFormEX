import style from "../Css/form.module.css";
import RingLoader from "react-spinners/RingLoader";
import Table from "./Table";
import { useState } from "react";
import axios from "axios";

function Form() {
  const [spinr,setSpiner] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [value, setValue] = useState({
    name: "",
    date: new Date().toISOString().substring(0, 10),
    comments: "",
    table: [[0, 0]],
  });

  const handelChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setSpiner(true);
    axios.post("/newRegistraion" ,value)
    .then(function (response) {
      console.log(response.data);
      setSpiner(false);
      setSubmitted(true);
    })
    .catch(function (error) {
      console.log(error);
    })


  };

  return (
    <div className={style.App}>
      {!submitted ? (
        <form onSubmit={handelSubmit}>
          <input
            className={style.name}
            placeholder="Creator Name"
            name="name"
            onChange={handelChange}
            required
          />

          <input
            className={style.date}
            type="date"
            defaultValue={value.date}
            name="date"
            onChange={handelChange}
          />

          <textarea
            placeholder="Comments..."
            name="comments"
            onChange={handelChange}
            required
          />

          <Table value={value} setValue={setValue} />

          {spinr?<RingLoader color="#86aaf5" />:<button type="submit"> Send </button>}
        </form>
      ) : (
        <div className={style.success}>Success! Thank you for registering</div>
      )}
    </div>
  );
}

export default Form;
