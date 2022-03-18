import React from "react";
import { Modal } from "bootstrap";
import axios from 'axios';

class Member extends React.Component{
    constructor(){
        super()
        this.state = {
            id_member:"",
            nama: "",
            alamat: "",
            jenis_kelamin:"",
            telepon:"",
            members:[
                {
                    id_member: "1", nama: "Smittrow", alamat: "London", jenis_kelamin: "pria", telepon: "0865463576"
                },
                {
                    id_member: "2", nama: "Donny", alamat: "Manchester", jenis_kelamin: "pria", telepon: "08136278332"
                },
                {
                    id_member: "3", nama: "Kyle", alamat: "Madrid", jenis_kelamin: "wanita", telepon: "0872378582"
                }
            ]
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }
    tambahData() {
       this.modalMember = new Modal (document.getElementById("modal_member"))
       this.modalMember.show() //menambilkan Modal
       //Reset state untuk form member
       this.setState({
            action: "tambah",
            id_member: Math.random(1,10000),
            nama:"", 
            alamat:"", 
            jenis_kelamin:"pria", 
            telepon:""  
       })
    }

    ubahData(id_member){
        
        this.modalMember = new Modal (document.getElementById("modal_member"))
       this.modalMember.show() //menambilkan Modal

       //mencari index posisi dari data member yang akan diubah
       let index = this.state.members.findIndex(member => member.id_member === id_member)

       this.setState({
            action: "ubah",
            id_member: id_member,
            nama: this.state.members[index].nama, 
            alamat: this.state.members[index].alamat, 
            jenis_kelamin: this.state.members[index].jenis_kelamin, 
            telepon: this.state.members[index].telepon  
       })
    }

    simpanData(event){
        event.preventDefault();
        //preventDefault() -> mencegah aksi dari form submit

        if(this.state.action === "tambah"){
            let endpoint = "http://localhost:8000/api/member"
            //menampung data dari user
        let data ={
            id_member: this.state.id_member,
            nama: this.state.nama,
            alamat: this.state.alamat,
            telepon: this.state.telepon,
            jenis_kelamin: this.state.jenis_kelamin
        }
        //tampung ke state members(array)
        // let temp = this.state.members
        // temp.push(data)//menambah data
        // this.setState({members: temp})
        axios.post(endpoint, data)
        .then(response => {window.alert(response.data.massage)
        this.getData()
        })
        .catch(error => console.log(error))

        //menghilangkan modal
        this.modalMember.hide()
            
        }else if(this.state.action === "ubah"){
            let endpoint = "http://localhost:8000/api/member/" + this.state.id_member

            // let temp = this.state.members
            // let index = temp.findIndex(member => member.id_member === this.state.id_member)

            let data ={
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat: this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
            }
            axios.put(endpoint, data)
        .then(response => {window.alert(response.data.massage)
        this.getData()
        })
        .catch(error => console.log(error))

            // this.setState({members: temp})

            this.modalMember.hide()
        }

        

    }

    hapusData(id_member) {
        if (window.confirm("Yakin nih dihapus?")) {
            let endpoint = "http://localhost:8000/api/member/" + id_member

            axios.delete(endpoint,{
                headers:{ 
                    Authorization: "Bearer " + this.state.token
                }
            })
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
        }
    }

    getData(){
        let endpoint = "http://localhost:8000/api/member"
        axios.get(endpoint)
        .then(response => {
            this.setState({members: response.data})
        })
        .catch(error => console.log(error))
    }
    componentDidMount(){
        //fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
    }

    render(){
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h3 className="text-white">
                            List of Member
                        </h3>
                    </div>
                    <div className="card-body">
                        <ul className="List-group">
                            {this.state.members.map(member =>(
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <small className="text-info">Nama</small> <br />
                                            <h5>{member.nama}</h5>
                                        </div>
                                        <div className="col-lg-2">
                                        <small className="text-info">Jenis Kelamin</small> <br />
                                            <h5>{member.jenis_kelamin}</h5>
                                        </div>
                                        <div className="col-lg-3">
                                        <small className="text-info">Telepon</small> <br />
                                            <h5>{member.telepon}</h5>
                                        </div>
                                        <div className="col-lg-10">
                                        <small className="text-info">Alamat</small> <br />
                                            <h5>{member.alamat}</h5>
                                        </div>
                                        <div className="col-lg-1">
                                            <div className="d-grid gap-1">
                                                <button className="btn btn-sm btn-outline-dark"
                                                onClick={() => this.ubahData(member.id_member)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-outline-dark"
                                                onClick={() => this.hapusData(member.id_member)}>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-outline-dark"
                        onClick={() => this.tambahData()}>
                            <h5 className="">Tambah Data</h5>    
                        </button>
                    </div>
                </div>
                {/*form modal data member*/}
                <div className="modal" id="modal_member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Member
                                </h4>
                            </div>
                            

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}> 
                                Nama
                                <input type="text" className="form-control mb-2"
                                value={this.state.nama}
                                onChange={(ev) => this.setState({nama :ev.target.value})}/>

                                Alamat
                                <input type="text" className="form-control mb-2"
                                value={this.state.alamat}
                                onChange={(ev) => this.setState({alamat :ev.target.value})}/>

                                Jenis Kelamin
                                <select className="form-control mb-2" 
                                value={this.state.jenis_kelamin}
                                onChange={(ev) => this.setState({jenis_kelamin :ev.target.value})}>
                                    <option value="Wanita">Wanita</option>
                                    <option value="pria">Pria</option>
                                </select>

                                Telepon
                                <input type="text" className="form-control mb-2"
                                value={this.state.telepon}
                                onChange={(ev) => this.setState({telepon :ev.target.value})}/>

                                <button className="btn btn-dark" type="submit">
                                    Simpan
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
export default Member