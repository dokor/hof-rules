/**
 * Gère la récupération des informations sur l'environnement d'exécution pour le navigateur
 */
import { observable, Observable, WritableObservable } from 'micro-observables';

export type ScreenSize = {
  isMobile: boolean,
  isDesktop: boolean
};

/**
 * Seuil d'affichage Mobile (pixels)
 */
const MOBILE_MAX_WIDTH = 800;

export function addGlobalEventListener(type: string, callback: (e: Event) => void, instantCallback?: () => void): void {
  window.addEventListener(type, callback);

  if (instantCallback) {
    instantCallback();
  }
}

export default class EnvironmentService {
  private readonly screenSizeObservable: WritableObservable<ScreenSize>;

  private currentScreenSize: ScreenSize = EnvironmentService.detectScreenSize();

  constructor() {
    this.screenSizeObservable = observable(this.currentScreenSize);
    addGlobalEventListener('resize', this.resizeHandler);
  }

  screenSize(): Observable<ScreenSize> {
    return this.screenSizeObservable;
  }

  private isBreaking(screenSize: ScreenSize) {
    return screenSize.isDesktop !== this.currentScreenSize.isDesktop
      || screenSize.isMobile !== this.currentScreenSize.isMobile;
  }

  private resizeHandler = () => {
    const newScreenSize: ScreenSize = EnvironmentService.detectScreenSize();

    if (this.isBreaking(newScreenSize)) {
      this.screenSizeObservable.set(newScreenSize);
    }
    this.currentScreenSize = newScreenSize;
  };

  private static detectScreenSize(): ScreenSize {
    const isMobile = window.innerWidth < MOBILE_MAX_WIDTH;
    const isDesktop = !isMobile;

    return { isMobile, isDesktop };
  }
}
