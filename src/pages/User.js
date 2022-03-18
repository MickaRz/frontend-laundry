import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl, authorization } from "../config";
class User extends React.Component {
    constructor() {
        super()
        this.state = {

            users: [
                {
                    id_user: "1", nama: "Ulrich", username: "Ulrich1337", role: "Admin"
                },
                {
                    id_user: "2", nama: "Hoppin", username: "Hoppin1337", role: "Users"
                },
                {
                    id_user: "3", nama: "Tresfild", username: "xXTresfild", role: "Kasir"
                }
            ],
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            fillPasword: "true",
        }
    }
    tambahData() {
        this.modalUser = new Modal(document.getElementById("modal_user"))
        this.modalUser.show()

        this.setState({
            id_user: Math.random(1, 100000),
            nama: "",
            username: "",
            password: "",
            role: "Users",
            action: "tambah",
            fillPasword: true,
        })
    }


    ubahData(id_user) {
        this.modalUsers = new Modal(document.getElementById("modal_user"))
        this.modalUsers.show()

        // mencari index posisi dari data user yang akan di ubah
        let index = this.state.users.findIndex(user => user.id_user === id_user)

        this.setState({

            id_user: id_user,
            nama: this.state.users[index].nama,
            username: this.state.users[index].username,
            password: "",
            // password: this.state.users[index].password,
            role: this.state.users[index].role,
            action: "ubah",
            fillPasword: false
        })
    }

    simpanData(event) {
        event.preventDefault();
        // prevent -> mencegah aksi defaut dari form submit


        if (this.state.action === "tambah") {
            let endpoint = `${baseUrl}/users`
            let data = {
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role,
                id_user: this.state.id_user,
            }
            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })

                .catch(error => console.log(error))

            // menghilangkan modal  
            // tambahkan ke state users (array) 
            // let temp = this.state.users
            // temp.push(data) // menambah data pada array
            //  this.setState({ users: temp })

            // menghilangkan modal
            this.modalUser.hide()

        } else if (this.state.action === "ubah") {
            // let temp = this.state.users
            let endpoint = `${baseUrl}/users/` + this.state.id_user
            // let index = temp.findIndex(user => user.id_user === this.state.id_user)
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                // password: this.state.password,
                role: this.state.role

            }

            // new
            if (this.state.fillPassword === true) {
                data.password = this.state.password
            }

            axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })

            // this.setState({ users: temp })
            //    this.modalUser.hide()
            this.modalUsers.hide()
        }
    }

    hapusData(id_user) {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini ?")) {
            // mencari posisi index dari data yang akan dihapus
            //let temp = this.state.users // tampung dulu di temp ya sobad :)
            //let index = temp.findIndex(user => user.id_user === id_user) // mencari index nya yak ges yak
            let endpoint = `${baseUrl}/users/` + id_user

            axios.delete(endpoint)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })

            // hapus data pada array sobad :D
            // temp.splice(index, 1)

            // this.setState({ users: temp })
        }
    }


    getData() {
        let endpoint = `${baseUrl}/users`
        axios.get(endpoint)
            .then(response => {
                this.setState({ users: response.data })
            })
            .catch(error => console.log(error))

    }


    componentDidMount() {
        this.getData();
        let user = JSON.parse(localStorage.getItem("user"));

        // cara pertama
        this.setState({
            role: user.role,
        })

        //cara kedua
        if (user.role === "admin") {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }

    showAddButton() {
        if (this.state.role === "admin") {
            return (
                <button className=" btn btn-sm btn-outline-primary"
                    onClick={() => this.tambahData()}><i class="fas fa-plus"></i> Tambah Data</button>
            );
        }
    }

    // Show Password Function
    showPassword() {
        if (this.state.fillPassword === true) {
            return (
                <div>
                    password
                    <input type="password" className="form-control mb-1"
                        required
                        value={this.state.password}
                        onChange={ev => this.setState({ password: ev.target.value })} />

                </div>
            )
        } else {
            return (
                <button className="card btn btn-mb-1 col-12 btn-outline-primary"
                    onClick={() => this.setState({ fillPassword: true })}><i class='fas fa-edit'></i> change password</button>

            )

        }
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h3 className="text-white">
                            𝙇𝙞𝙨𝙩 𝙐𝙨𝙚𝙧
                        </h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.users.map(user => (
                                <li className="list-group-item">
                                    <div className="row">
                                        {/*   <div className="col-lg-4">
                                            <small className="text-primary">ID</small> <br />
                                            <h6>{user.id_user}</h6>
                                        </div> */}
                                        <div className="col-lg-4">
                                            <small className="text-primary">Username</small> <br />
                                            <h6>{user.username}</h6>
                                        </div>
                                        {/* <div className="col-lg-4">
                                            <small className="text-primary">Password</small> <br />
                                            <h6>{user.password}</h6>
                                        </div> */}

                                        <div className="col-lg-4">
                                            <small className="text-primary">Nama</small> <br />
                                            <h6>{user.nama}</h6>
                                        </div>
                                        <div className="col-lg-3">
                                            <small className="text-primary">role</small> <br />
                                            <h6>{user.role}</h6>
                                        </div>


                                        <div className="col-lg-1">
                                            <div className="d-grid gap-2">
                                                <button className={`btn btn-sm btn-primary   ${this.state.visible ? `` : `d-none`} `}
                                                    onClick={() => this.ubahData(user.id_user)}> <i class="fas fa-edit"></i> Ubah
                                                </button>

                                                <button className={`btn btn-sm btn-outline-primary   ${this.state.visible ? `` : `d-none`} `}
                                                    onClick={() => this.hapusData(user.id_user)}><i class="fas fa-trash"></i>  Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <br />
                        <div>
                            {this.showAddButton()}
                        </div>
                        {/* <button className=" btn btn-sm btn-outline-primary"
                            onClick={() => this.tambahData()}><i class="fas fa-plus"></i> Tambah Data</button> */}
                    </div>

                    {/* Form Modal User */}
                </div>
                <div className="modal fade" id="modal_user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-primary">
                                <h4 className="text-white">
                                    {/* get good, get gamesense */}
                                    Form Data Users
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2" value={this.state.nama}
                                        onChange={(ev) => this.setState({ nama: ev.target.value })} />

                                    Username
                                    <input type="text" className="form-control mb-2" value={this.state.username}
                                        onChange={(ev) => this.setState({ username: ev.target.value })} />

                                    {this.showPassword()}


                                    {/* password
                                    <input type="password" className="form-control mb-2" placeholder="Password" value={this.state.password}
                                        onChange={(ev) => this.setState({ password: ev.target.value })} required /> */}
                                    <br />
                                    Role
                                    <select className="form-control mb-2" value={this.state.role}
                                        onChange={(ev) => this.setState({ role: ev.target.value })}>
                                        <option value="user">Users</option>
                                        <option value="admin">Admin</option>
                                        <option value="kasir">Kasir</option>

                                    </select>

                                    <button className="btn btn-sm btn-outline-primary " type="submit">
                                        <i class="fas fa-plus"></i> Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default User