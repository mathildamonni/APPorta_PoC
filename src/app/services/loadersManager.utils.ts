import { Injectable } from '@angular/core';
import { LoadingController, AnimationController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadersManagerUtils {
  private loading: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController, private animationCtrl: AnimationController) {}

  public presentLoader = async (message: string = null, spinner: boolean = true): Promise<void> => {
    const createObj = {};

    if (message) createObj['message'] = message;
    if (spinner) createObj['spinner'] = 'circles';
    else {
      createObj['spinner'] = null;
      createObj['cssClass'] = 'ion-text-center';
    }

    createObj['translucent'] = true;
    createObj['backdropDismiss'] = false;
    createObj['color'] = 'primary';

    this.loading = await this.loadingCtrl.create(createObj);
    await this.loading.present();
  };

  public dismissLoader = (): void => {
    if (this.loading) {
      this.loading.leaveAnimation = (baseEl) =>
        this.animationCtrl.create().addElement(baseEl).duration(150).fromTo('opacity', 1, 0);

      void this.loading.dismiss();
    }
  };
}
