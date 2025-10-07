import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Code,
  Play,
  RotateCcw,
  Download,
  Save,
  ArrowLeft,
  FileCode,
  Palette,
  Zap,
  Eye,
  Maximize2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CodeIDE = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const projectTitle = searchParams.get('project') || 'Untitled Project';
  const projectType = searchParams.get('type') || 'web';

  const [html, setHtml] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectTitle}</title>
</head>
<body>
    <h1>Welcome to Your Project!</h1>
    <p>Start building your ${projectTitle} here.</p>
</body>
</html>`);

  const [css, setCss] = useState(`body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #333;
    min-height: 100vh;
}

h1 {
    color: white;
    text-align: center;
    margin-bottom: 20px;
}

p {
    color: white;
    text-align: center;
    font-size: 18px;
}`);

  const [js, setJs] = useState(`// Write your JavaScript code here
console.log('Project started: ${projectTitle}');

// Example: Add interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
});`);

  const [output, setOutput] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const runCode = () => {
    const combinedCode = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${css}</style>
      </head>
      <body>
        ${html.replace(/<head>[\s\S]*?<\/head>/i, '')}
        <script>
          try {
            ${js}
          } catch (error) {
            console.error('JavaScript Error:', error);
            document.body.innerHTML += '<div style="color: red; padding: 20px; background: #ffebee; border-left: 4px solid red; margin: 20px;">Error: ' + error.message + '</div>';
          }
        </script>
      </body>
      </html>
    `;
    setOutput(combinedCode);

    toast({
      title: "Code executed!",
      description: "Your project is now running in the preview.",
    });
  };

  const resetCode = () => {
    setHtml('<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Project</title>\n</head>\n<body>\n    <h1>Hello World</h1>\n</body>\n</html>');
    setCss('body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}');
    setJs('// Your JavaScript code here\nconsole.log("Hello World");');
    setOutput('');
  };

  const saveProject = () => {
    const projectData = { html, css, js, title: projectTitle };
    localStorage.setItem(`project_${Date.now()}`, JSON.stringify(projectData));
    toast({
      title: "Project saved!",
      description: "Your project has been saved locally.",
    });
  };

  const downloadProject = () => {
    const combinedCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectTitle}</title>
    <style>
${css}
    </style>
</head>
<body>
${html.replace(/<head>[\s\S]*?<\/head>/i, '')}
    <script>
${js}
    </script>
</body>
</html>`;

    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectTitle.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Project downloaded!",
      description: "Your HTML file has been downloaded.",
    });
  };

  // Auto-run on initial load
  useEffect(() => {
    runCode();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[2000px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-golden" />
                <h1 className="text-lg font-semibold text-foreground">{projectTitle}</h1>
                <Badge variant="outline" className="text-golden border-golden/30">
                  {projectType === 'web' ? 'Web Project' : 'Practice'}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={saveProject}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={downloadProject}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetCode}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                onClick={runCode}
                className="bg-golden hover:bg-golden/90"
                size="sm"
              >
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* IDE Layout */}
      <div className="max-w-[2000px] mx-auto p-4">
        <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'grid-cols-2'} gap-4 h-[calc(100vh-120px)]`}>
          {/* Code Editor Panel */}
          {!isFullscreen && (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                <Tabs defaultValue="html" className="flex-1 flex flex-col">
                  <div className="border-b border-border/50 px-4 pt-4">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="html" className="gap-2">
                        <FileCode className="w-4 h-4" />
                        HTML
                      </TabsTrigger>
                      <TabsTrigger value="css" className="gap-2">
                        <Palette className="w-4 h-4" />
                        CSS
                      </TabsTrigger>
                      <TabsTrigger value="js" className="gap-2">
                        <Zap className="w-4 h-4" />
                        JavaScript
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="html" className="flex-1 m-0 p-4">
                    <Textarea
                      value={html}
                      onChange={(e) => setHtml(e.target.value)}
                      className="font-mono text-sm h-full resize-none"
                      placeholder="Write your HTML here..."
                    />
                  </TabsContent>

                  <TabsContent value="css" className="flex-1 m-0 p-4">
                    <Textarea
                      value={css}
                      onChange={(e) => setCss(e.target.value)}
                      className="font-mono text-sm h-full resize-none"
                      placeholder="Write your CSS here..."
                    />
                  </TabsContent>

                  <TabsContent value="js" className="flex-1 m-0 p-4">
                    <Textarea
                      value={js}
                      onChange={(e) => setJs(e.target.value)}
                      className="font-mono text-sm h-full resize-none"
                      placeholder="Write your JavaScript here..."
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Preview Panel */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50 flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
              <div className="border-b border-border/50 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-golden" />
                  <span className="font-medium text-foreground">Preview</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 bg-white">
                <iframe
                  ref={iframeRef}
                  srcDoc={output}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeIDE;
