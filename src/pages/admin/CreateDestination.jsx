import React from 'react';
import DestinationForm from '../../components/DestinationForm';
import { SectionTitle } from '../../components/SectionTitle';

export default function CreateDestination() {
  return (
    <div className="p-6">
      <SectionTitle
        title="Create New Destination"
        description="Use the form below to add a new travel destination to the platform."
      />
      <DestinationForm />
    </div>
  );
}
