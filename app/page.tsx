export default function Home() {
  return (
    <main className="p-8">
      <h1 className="font-satoshi font-bold text-4xl mb-4">
        Testing Satoshi Font
      </h1>
      <div className="space-y-4">
        <p className="font-satoshi font-light">
          This is Satoshi Light (300)
        </p>
        <p className="font-satoshi font-normal">
          This is Satoshi Regular (400)
        </p>
        <p className="font-satoshi font-medium">
          This is Satoshi Medium (500)
        </p>
        <p className="font-satoshi font-bold">
          This is Satoshi Bold (700)
        </p>
      </div>
    </main>
  );
} 