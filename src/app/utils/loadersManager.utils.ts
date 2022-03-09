import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class LoadersManagerUtils {
  private loading: HTMLIonLoadingElement;

  constructor(private loadingCtrl: LoadingController) {}

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
    if (this.loading) void this.loading.dismiss();
  };
}
