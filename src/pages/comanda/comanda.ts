import { DetalhePedidoPage } from './../detalhe-pedido/detalhe-pedido';
//Modulos
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
//classes
import { Comanda } from '../../class/ItemComanda';
import { ItemPedido } from '../../class/ItemPedido';


@IonicPage()
@Component({
  selector: 'page-comanda',
  templateUrl: 'comanda.html',
})
export class ComandaPage {
  public comanda: Comanda = new Comanda;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
  ) {
    this.loadComanda();
  }

  loadComanda(){
    this.storage.get("comanda")
      .then((data:Comanda)=>{
        this.comanda = new Comanda();
        this.comanda.pedido = new Array<ItemPedido>();
        if(data){ // Se já tem conteudo
          this.comanda.id = data.id;
          this.comanda.pedido = this.comanda.pedido.concat(data.pedido);
          this.comanda.mesa = data.mesa;
        }
        this.storage.set("comanda", this.comanda);
      }
    );
  }

  returnStatus(statusNum:number, deviceNum:number):string{
    let statusTxt:string = "";
    //Prefixo
    if(deviceNum == 1) statusTxt = statusTxt.concat("md-");
    if(deviceNum == 2) statusTxt = statusTxt.concat("ios-");
    //Sufixo
    if(statusNum == 0) statusTxt = statusTxt.concat("time");
    if(statusNum == 1) statusTxt = statusTxt.concat("checkmark");
    if(statusNum == 2) statusTxt = statusTxt.concat("close");

    return statusTxt;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComandaPage');
  }

  detalhe(item:any){
    this.navCtrl.push(DetalhePedidoPage, item);
  }

}
