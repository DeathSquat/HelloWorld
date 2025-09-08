import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Save, 
  Share2, 
  Code2, 
  Terminal,
  FileCode,
  Lightbulb
} from 'lucide-react';

const CodePlayground = () => {
  const [activeLanguage, setActiveLanguage] = useState('python');
  const [code, setCode] = useState({
    python: `# Hello World in Python
print("Hello, World!")

# Your code here
def greet(name):
    return f"Hello, {name}!"

print(greet("Nishchay"))`,
    javascript: `// Hello World in JavaScript
console.log("Hello, World!");

// Your code here
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Nishchay"));`,
    java: `// Hello World in Java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Your code here
        String name = "Nishchay";
        System.out.println("Hello, " + name + "!");
    }
}`,
    cpp: `// Hello World in C++
#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    // Your code here
    std::string name = "Nishchay";
    std::cout << "Hello, " << name << "!" << std::endl;
    
    return 0;
}`
  });

  const [output, setOutput] = useState('Click "Run Code" to see output here...');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { id: 'python', name: 'Python', icon: '🐍', color: 'bg-blue-500' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'java', name: 'Java', icon: '☕', color: 'bg-orange-500' },
    { id: 'cpp', name: 'C++', icon: '⚙️', color: 'bg-purple-500' }
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running code...');
    
    // Simulate code execution
    setTimeout(() => {
      const outputs = {
        python: `Hello, World!
Hello, Nishchay!

Process finished with exit code 0`,
        javascript: `Hello, World!
Hello, Nishchay!

Execution completed successfully`,
        java: `Hello, World!
Hello, Nishchay!

BUILD SUCCESSFUL`,
        cpp: `Hello, World!
Hello, Nishchay!

Program executed successfully`
      };
      
      setOutput(outputs[activeLanguage as keyof typeof outputs]);
      setIsRunning(false);
    }, 2000);
  };

  const handleCodeChange = (value: string) => {
    setCode(prev => ({
      ...prev,
      [activeLanguage]: value
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Code Editor */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Code2 className="w-5 h-5 text-golden" />
              Code Playground
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selector */}
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang.id}
                onClick={() => setActiveLanguage(lang.id)}
                variant={activeLanguage === lang.id ? "default" : "outline"}
                size="sm"
                className="flex items-center gap-2"
              >
                <span>{lang.icon}</span>
                {lang.name}
              </Button>
            ))}
          </div>

          {/* Code Editor */}
          <div className="relative">
            <textarea
              value={code[activeLanguage as keyof typeof code]}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-80 p-4 bg-background-deep rounded-lg border border-border text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Write your code here..."
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">
                <FileCode className="w-3 h-3 mr-1" />
                {languages.find(l => l.id === activeLanguage)?.name}
              </Badge>
            </div>
          </div>

          {/* Run Button */}
          <Button 
            onClick={runCode} 
            disabled={isRunning}
            className="w-full"
          >
            {isRunning ? (
              <>
                <Terminal className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output and Resources */}
      <div className="space-y-4">
        {/* Output Terminal */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Terminal className="w-5 h-5 text-golden" />
              Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-background-deep rounded-lg p-4 h-48 overflow-y-auto">
              <pre className="text-sm text-foreground font-mono whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-golden" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-golden mt-2"></div>
                <span>Use proper indentation for better code readability</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-golden mt-2"></div>
                <span>Add comments to explain complex logic</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-golden mt-2"></div>
                <span>Test your code with different inputs</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-golden mt-2"></div>
                <span>Press Ctrl+S to save your progress</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodePlayground;