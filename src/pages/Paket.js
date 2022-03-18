// import { render } from "@testing-library/react";
import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";

class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            id_paket: "",
            jenis_paket: "",
            harga: "",
            pakets:[
                {
                    id_paket: "1", jenis_paket: "cuci basah", harga: "5000"
                },
                {
                    id_paket: "2", jenis_paket: "cuci kering", harga: "7000"
                },
                {
                    id_paket: "3", jenis_paket: "cuci setrika", harga: "6000"
                }
            ]
        }
    }
    tambahData() {
        this.modalPaket = new Modal (document.getElementById("modal_paket"))
        this.modalPaket.show() //menambilkan Modal
        //Reset state untuk form member
        this.setState({
             action: "tambah",
             id_paket: Math.random(1,10000),
             jenis_paket:"", 
             harga:""  
        })
     }

     ubahData(id_paket){
        this.modalPaket = new Modal (document.getElementById("modal_paket"))
       this.modalPaket.show() //menambilkan Modal

       //mencari index posisi dari data paket yang akan diubah
       let index = this.state.pakets.findIndex(paket => paket.id_paket === id_paket)

       this.setState({
            action: "ubah",
            id_paket: id_paket, 
            jenis_paket: this.state.pakets[index].jenis_paket, 
            harga: this.state.pakets[index].harga 
       })
    }
    hapusData(id_paket) {
        if (window.confirm("Yakin nih dihapus?")) {
            let endpoint = "http://localhost:8000/api/paket/" + id_paket

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


     simpanData(event){
        event.preventDefault();
        //preventDefault() -> mencegah aksi dari form submit

        if(this.state.action === "tambah"){
            let endpoint = "http://localhost:8000/api/paket"
            //menampung data dari user
        let data ={
            id_paket: this.state.id_paket,
            jenis_paket: this.state.jenis_paket,
            harga: this.state.harga
        }
        // //tampung ke state members(array)
        // let temp = this.state.pakets
        // temp.push(data)//menambah data
        // this.setState({pakets: temp})

        axios.post(endpoint, data)
        .then(response => {window.alert(response.data.massage)
        this.getData(
        )})

        //menghilangkan modal
        this.modalPaket.hide()
            
        }else if(this.state.action === "ubah"){
            let endpoint = "http://localhost:8000/api/member/" + this.state.id_member
            // let temp = this.state.pakets
            // let index = temp.findIndex(paket => paket.id_paket === this.state.id_paket)

            let data ={
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga

            }
            axios.put(endpoint, data)
        .then(response => {window.alert(response.data.massage)
        this.getData()
        })
        .catch(error => console.log(error))
            
            // this.setState({pakets: temp})

            this.modalPaket.hide()
        }
    }

    getData(){
        let endpoint = "http://localhost:8000/api/paket"
        axios.get(endpoint)
        .then(response => {
            this.setState({pakets: response.data})
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        //fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
    }

    render() {
        return(
            <div className="container">
                <div className="card">
                    <div className="card-header bg-primary">
                        <h3 className="text-white">
                            List Paket
                        </h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.pakets.map(paket =>(
                                <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <small className="text-info">Jenis Paket</small> <br />
                                        <h5>{paket.jenis_paket}</h5> <br />
                                    </div>
                                    <div className="col-lg-5">
                                        <small className="text-info">Harga</small> <br />
                                        <h5>{paket.harga}</h5> <br />
                                    </div>
                                    <div className="col-lg-2">
                                            <div className="d-grid gap-1">
                                                <button className="btn btn-sm btn-dark"
                                                onClick={() => this.ubahData(paket.id_paket)}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-sm btn-dark"
                                                onClick={() => this.hapusData(paket.id_paket)}>
                                                    Hapus
                                                </button>
                                            </div>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ul>
                        <button className="btn btn-info"
                        onClick={() => this.tambahData()}>
                            <h5 className="text-white">Tambah Data</h5>    
                        </button>
                    </div>
                </div>
                {/*form modal data paket*/}
                <div className="modal" id="modal_paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Data Paket
                                </h4>
                            </div>
                            

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}> 
                                Jenis paket
                                <input type="text" className="form-control mb-2"
                                value={this.state.jenis_paket}
                                onChange={(ev) => this.setState({jenis_paket :ev.target.value})}/>

                                Harga
                                <input type="text" className="form-control mb-2"
                                value={this.state.harga}
                                onChange={(ev) => this.setState({harga :ev.target.value})}/>

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

export default Paket;
