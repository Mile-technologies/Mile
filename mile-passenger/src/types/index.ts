export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Ride {
  id: string;
  driverId: string;
  passengerId: string;
  status: 'pending' | 'accepted' | 'completed';
}
