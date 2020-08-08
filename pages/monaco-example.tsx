import MonacoEditorComponent from 'components/monaco-editor';
import Layout from 'components/layout';

const defaultCode = `# Program to display the Fibonacci sequence up to n-th term

nterms = int(input("How many terms? "))

# first two terms
n1, n2 = 0, 1
count = 0

# check if the number of terms is valid
if nterms <= 0:
   print("Please enter a positive integer")
elif nterms == 1:
   print("Fibonacci sequence upto",nterms,":")
   print(n1)
else:
   print("Fibonacci sequence:")
   while count < nterms:
       print(n1)
       nth = n1 + n2
       # update values
       n1 = n2
       n2 = nth
       count += 1`;

export default function MonacoEditorPage() {
  return (
    <Layout>
      <div className="row">
        <div className="col-3">Monaco</div>
        <div className="col-9">
          <MonacoEditorComponent defaultCode={defaultCode} />
        </div>
      </div>
    </Layout>
  );
}
