import PackageForm from './../../components/PackageForm';

export default function CreatePackage() {
  return (
    <div className="p-6">
      <PackageForm isOpen={true} onClose={() => {}} userId={'admin-user-id'} />
    </div>
  );
}
