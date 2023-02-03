import { React , Component } from 'react';

export default class App extends Component {
  constructor(){
    super();
    this.state={
      employeeData : [],
      act : 0

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let employeeData = this.state.employeeData;
    let name = this.refs.txtName.value;
    let age = this.refs.txtAge.value;
    console.log(name,age);

    if(this.state.act === 0)
    {
      let name = this.refs.txtName.value;
      let newEmployee = {
        "name" : name,
        "age" : age
      }
      const apiUrl = 'http://localhost:4000/employees/';
    fetch(apiUrl,{method : "POST",body : JSON.stringify(newEmployee),headers: {'Content-Type':"application/json"}})
      .then((response) => response.json())
      .then((data) => {
        console.log("DONE",data)
      this.setState({employeeData:[...this.state.employeeData,data]})
    });
      
    }
    else
    {
      let index = this.state.index;
      employeeData[index].name = name;
      employeeData[index].age = age;
      const foundEmployee = employeeData[index]
      const apiUrl = 'http://localhost:4000/employees/'+foundEmployee.id;
    fetch(apiUrl,{method : "PUT",body : JSON.stringify(foundEmployee),headers: {'Content-Type':"application/json"}})
      .then((response) => response.json())
      .then((data) => {
        console.log("DONE",data)
        this.setState({employeeData:[...this.state.employeeData,data]})
      });
      
    }

    this.refs.myForm.reset();
  }
  

  handleEdit = (index) => {
    let employeeData = this.state.employeeData[index];
    this.refs.txtName.value = employeeData.name;
    this.refs.txtAge.value = employeeData.age;

    this.setState({
      // employeeData : employeeData,
      act : 1,
      index : index
    })
  }
  
  handleDelete = (index) => {

    let employeeData = this.state.employeeData;
    const foundEmployee = employeeData[index];
    const apiUrl = 'http://localhost:4000/employees/'+foundEmployee.id;
    fetch(apiUrl,{method : "DELETE"})
      .then((response) => response.json())
      .then((data) => console.log("DONE",data));
   
  }
  componentDidUpdate(){
    const apiUrl = 'http://localhost:4000/employees';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({employeeData : data}));
  }
  //Fetching API from json
  componentDidMount() {
    const apiUrl = 'http://localhost:4000/employees';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => this.setState({employeeData : data}));
  }
  render() {
    let employeeData = this.state.employeeData;
    return (
      <div>
        <form ref='myForm' onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input type='text' ref='txtName' placeholder='Enter your name' />
          <label>Age</label>
          <input type='text' ref='txtAge' placeholder='Enter your Age' />
          <button type='submit'>save</button>
        </form>
        <table>
          <tr>
            <th>NAME</th>
            <th>AGE</th>
          </tr>

          {
            employeeData.map((data , i)=>
            <tr key={i}>
              <td>{data.name}</td>
              <td>{data.age}</td>
              <td>
              <button onClick={() => this.handleEdit(i)}>Edit</button>
              </td>
              <td>
              <button onClick={() => this.handleDelete(i)}>Delete</button>
              </td>
            </tr>
            )
          }
        </table>
      </div>
    )
  }
}
