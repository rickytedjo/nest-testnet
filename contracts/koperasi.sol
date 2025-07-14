// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract KoperasiCrowdfunding {
    struct Proyek {
        address payable mitra;
        string namaProyek;
        uint targetDana;
        uint totalDanaTerkumpul;
        uint hargaToken;
        uint jumlahToken;
        bool aktif;
        bool sukses;
        mapping(address => uint) investorToken;
        address[] daftarInvestor;
    }

    address public A_koperasi;
    uint public B_totalProyek;
    uint public B_totalInvestor;

    mapping(uint => Proyek) public D_proyekList;
    uint[] public X_daftarProyekAktif;
    address[] public X_daftarInvestor;

    constructor() {
        A_koperasi = msg.sender;
    }

    modifier hanyaKoperasi() {
        require(msg.sender == A_koperasi, "Hanya koperasi yang boleh");
        _;
    }

    function daftarProyek(
        address payable _addressMitra,
        string memory _namaProyek,
        uint _targetDana,
        uint _jumlahToken,
        uint _hargaToken
    ) public hanyaKoperasi {
        require(_addressMitra != address(0), "Alamat mitra tidak valid");

        Proyek storage p = D_proyekList[B_totalProyek];
        p.mitra = _addressMitra;
        p.namaProyek = _namaProyek;
        p.targetDana = _targetDana;
        p.jumlahToken = _jumlahToken;
        p.hargaToken = _hargaToken;
        p.aktif = true;

        X_daftarProyekAktif.push(B_totalProyek);
        B_totalProyek++;
    }

    function beliToken(uint _idProyek, uint _jumlahToken) public payable {
        Proyek storage p = D_proyekList[_idProyek];
        require(p.aktif, "Proyek tidak aktif");

        uint totalHarga = _jumlahToken *p.hargaToken;
        require(msg.value >= _jumlahToken * p.hargaToken, "Jumlah ETH tidak sesuai");
        require(p.jumlahToken >= _jumlahToken, "Token tidak cukup tersedia");

        
        if (msg.value > totalHarga){
            payable(msg.sender).transfer(msg.value - totalHarga);
        }

        if (p.investorToken[msg.sender] == 0) {
            p.daftarInvestor.push(msg.sender);
        }

        if (!sudahTerdaftarInvestor(msg.sender)) {
            X_daftarInvestor.push(msg.sender);
            B_totalInvestor++;
        }

        p.investorToken[msg.sender] += _jumlahToken;
        p.jumlahToken -= _jumlahToken;
        p.totalDanaTerkumpul += msg.value;

        if (p.totalDanaTerkumpul >= p.targetDana) {
            p.sukses = true;
            p.aktif = false;
            hapusDariAktif(_idProyek);
        }
    }

    function D_investorList(uint _idProyek) public view returns (address[] memory) {
        return D_proyekList[_idProyek].daftarInvestor;
    }

    function E_cekToken(uint _idProyek, address _investor) public view returns (uint) {
        return D_proyekList[_idProyek].investorToken[_investor];
    }

    function C_getProyekAktif() public view returns (uint[] memory) {
        return X_daftarProyekAktif;
    }

    function C_getTotalInvestor() public view returns (address[] memory) {
        return X_daftarInvestor;
    }

    function hapusDariAktif(uint _idProyek) internal {
        for (uint i = 0; i < X_daftarProyekAktif.length; i++) {
            if (X_daftarProyekAktif[i] == _idProyek) {
                X_daftarProyekAktif[i] = X_daftarProyekAktif[X_daftarProyekAktif.length - 1];
                X_daftarProyekAktif.pop();
                break;
            }
        }
    }

    function sudahTerdaftarInvestor(address _investor) internal view returns (bool) {
        for (uint i = 0; i < X_daftarInvestor.length; i++) {
            if (X_daftarInvestor[i] == _investor) {
                return true;
            }
        }
        return false;
    }
}
