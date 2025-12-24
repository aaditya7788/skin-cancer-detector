import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;
  
  selectedFile: File | null = null;
  result: any = null;
  loading = false;
  error = '';
  
  // Camera related
  showCamera = false;
  stream: MediaStream | null = null;
  capturedImage: string | null = null;

  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.result = null;
    this.error = '';
    this.capturedImage = null;
  }

  async startCamera() {
    try {
      this.showCamera = true;
      this.error = '';
      this.capturedImage = null;
      this.selectedFile = null;
      
      // Request camera access
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      // Wait for view to update
      setTimeout(() => {
        if (this.videoElement && this.videoElement.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
        }
      }, 100);
    } catch (err) {
      console.error('Camera error:', err);
      this.error = 'Could not access camera. Please check permissions.';
      this.showCamera = false;
    }
  }

  capturePhoto() {
    if (!this.videoElement || !this.canvasElement) return;
    
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image as data URL
    this.capturedImage = canvas.toDataURL('image/jpeg');
    
    // Convert to File object
    canvas.toBlob((blob) => {
      if (blob) {
        this.selectedFile = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      }
    }, 'image/jpeg');
    
    // Stop camera
    this.stopCamera();
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.showCamera = false;
  }

  retakePhoto() {
    this.capturedImage = null;
    this.selectedFile = null;
    this.startCamera();
  }

  predict() {
    if (!this.selectedFile) return;

    this.loading = true;
    this.error = '';
    this.result = null;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post(`${environment.apiUrl}/api/predict`, formData)
      .subscribe({
        next: (res) => {
          this.result = res;
          this.loading = false;
        },
        error: (err) => {
          console.error('Prediction error:', err);
          this.error = 'Prediction failed. Please make sure the Node backend is running.';
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    // Clean up camera stream when component is destroyed
    this.stopCamera();
  }
}
