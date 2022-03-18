import React from "react"
import axios from "axios"
import { baseUrl } from "../config";

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: []
        }
    }

    getData() {
        let endpoint = `${baseUrl}/transaksi`
        axios.get(endpoint)
            .then(response => {
                this.setState({ transaksi: response.data })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.getData()
    }

    convertStatus(id_transaksi, status) {
        if (status === 1) {
            return (
                <div className="badge bg-secondary"><i class='far fa-clock'></i> Transaksi Baru
                    <br />
                    <br />
                    <button type="submit"
                        onClick={() => this.changeStatus(id_transaksi, 2)}
                        className="btn btn-sm btn-outline-light"
                    ><i class='far fa-caret-square-up'></i> update status
                    </button>
                </div>
            );
        } else if (status === 2) {
            return (
                <div className="badge bg-warning"> <i class='far fa-hourglass'></i> Sedang Diproses
                    <br />
                    <br />
                    <button
                        onClick={() => this.changeStatus(id_transaksi, 3)}
                        className="btn btn-sm btn-outline-light"
                    ><i class='far fa-caret-square-up'></i> update status
                    </button>
                </div>
            );
        } else if (status === 3) {
            return (
                <div className="badge bg-primary"> <i class='fas fa-external-link-alt'></i> Siap Diambil
                    <br />
                    <br />
                    <button type="submit"
                        onClick={() => this.changeStatus(id_transaksi, 4)}
                        className="btn btn-sm btn-outline-light"
                    ><i class='far fa-caret-square-up'></i> update status
                    </button>
                </div>
            );
        } else if (status === 4) {
            return (
                <div className="badge bg-success"> <i class='far fa-calendar-check'></i> Sudah Diambil</div>
            )
        }

    }


   // LANJUTAN
   componentDidMount() {
    this.getData();
}

changeStatus(id, status) {
    if (
        window.confirm(`Apakah anda yakin ingin mengganti status transaksi ini?`)
    ) {
        let endpoint = `${baseUrl}/transaksi/status/${id}`;
        let data = {
            status: status,
        };

        axios
            .post(endpoint, data)
            .then((response) => {
                window.alert(`Status transaksi telah diubah`);
                this.getData();
            })
            .catch((error) => console.log(error));
    }
}
    
    render() {
        return (
            <div className="container">
            <div className="card">
                <div className="card-header bg-primary">
                    <h4 className="text-white">
                        List Transaksi
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {this.state.transaksi.map(trans => (
                            <li className="list-group-item">
                                <div className="row">
                                    {/* this is member area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Member
                                        </small> <br />
                                        {trans.member.nama}
                                    </div>

                                    {/* this is tgl transaksi area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Transaksi
                                        </small> <br />
                                        {trans.tgl}
                                    </div>

                                    {/* this is tgl batas waktu area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Batas Waktu
                                        </small> <br />
                                        {trans.batas_waktu}
                                    </div>

                                    {/* this is tgl tanggal bayar area */}
                                    <div className="col-lg-3">
                                        <small className="text-info">
                                            Tanggal Bayar
                                        </small> <br />
                                        {trans.tgl_bayar}
                                    </div>

                                    {/* this is tgl status area */}
                                    <div className="col-lg-5">
                                        <small className="text-info">
                                            Status
                                        </small> <br />
                                        {this.convertStatus(trans.id_transaksi, trans.status)}
                                    </div>
                                </div>

                                {/* area detail transaksi */}
                                <h5>Detail Transaksi</h5>
                                {trans.detail_transaksi.map(detail => (
                                    <div className="row">
                                        {/* area nama paket col-3 */}
                                        <div className="col-lg-3">
                                            {detail.paket.jenis_paket} 
                                        </div>
                                        {/* area quantity col-2 */}
                                        <div className="col-lg-2">
                                            Qty: {detail.qty}
                                        </div>
                                        {/* area harga paket col-3 */}
                                        <div className="col-lg-3">
                                            @ Rp {detail.paket.harga}
                                        </div>
                                        {/* area harga total col-4 */}
                                        <div className="col-lg-4">
                                            Rp {detail.paket.harga * detail.qty}
                                        </div>
                                    </div>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            </div>
        )
    }
}