import { LoadingController, ToastController } from '@ionic/angular';

export class Utils {

  static async dismissLoading(loading: HTMLIonLoadingElement) {
    const { role, data } = await loading.onDidDismiss();
  }

  static async showToast(msg: string, k: ToastController) {
    const toast = await k.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}