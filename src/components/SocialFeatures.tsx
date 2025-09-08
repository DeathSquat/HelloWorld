import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  BookOpen,
  Trophy,
  Code,
  Clock,
  ThumbsUp,
  MessageSquare,
  UserPlus,
  Send
} from 'lucide-react';

const SocialFeatures = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Priya Sharma',
        avatar: '/placeholder.svg',
        level: 'Advanced',
        badge: 'Python Expert'
      },
      content: 'Just completed the Advanced Python course! The decorators section was mind-blowing 🤯. Who else is working on Python advanced concepts?',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ['Python', 'Advanced', 'Decorators'],
      liked: false
    },
    {
      id: 2,
      user: {
        name: 'Arjun Patel',
        avatar: '/placeholder.svg',
        level: 'Intermediate',
        badge: 'JavaScript Ninja'
      },
      content: 'Working on a React project and implementing hooks. Any tips for optimizing re-renders? Drop your best practices below! 👇',
      timestamp: '4 hours ago',
      likes: 18,
      comments: 12,
      shares: 5,
      tags: ['React', 'JavaScript', 'Hooks'],
      liked: true
    },
    {
      id: 3,
      user: {
        name: 'Kavya Reddy',
        avatar: '/placeholder.svg',
        level: 'Beginner',
        badge: 'Rising Star'
      },
      content: 'Solved my first algorithm problem today! Binary search was tricky but I finally got it. Thanks to everyone who helped in the study group 🙏',
      timestamp: '6 hours ago',
      likes: 32,
      comments: 15,
      shares: 2,
      tags: ['Algorithms', 'Binary Search', 'Achievement'],
      liked: true
    }
  ]);

  const studyGroups = [
    {
      id: 1,
      name: 'Python Beginners',
      members: 234,
      activity: 'Very Active',
      description: 'Learn Python fundamentals together',
      joined: true
    },
    {
      id: 2,
      name: 'Web Dev Warriors',
      members: 189,
      activity: 'Active',
      description: 'Full-stack web development discussions',
      joined: false
    },
    {
      id: 3,
      name: 'Algorithm Enthusiasts',
      members: 156,
      activity: 'Moderate',
      description: 'Data structures and algorithms practice',
      joined: true
    }
  ];

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleShare = (postId: number) => {
    console.log('Sharing post:', postId);
  };

  const handleJoinGroup = (groupId: number) => {
    console.log('Joining group:', groupId);
  };

  const handleSubmitPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: {
          name: 'Nishchay Chaurasia',
          avatar: '/placeholder.svg',
          level: 'Intermediate',
          badge: 'Code Explorer'
        },
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0,
        shares: 0,
        tags: [],
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Main Feed */}
      <div className="lg:col-span-3 space-y-6">
        {/* Create Post */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Share Your Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-golden text-background">NC</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <Textarea
                  placeholder="What are you learning today? Share your progress, ask questions, or celebrate achievements..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 text-sm text-muted-foreground">
                    <span>Add tags:</span>
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      #Python
                    </Button>
                    <Button variant="outline" size="sm" className="h-6 text-xs">
                      #Achievement
                    </Button>
                  </div>
                  <Button onClick={handleSubmitPost} size="sm" disabled={!newPost.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* User Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.user.avatar} />
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {post.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">{post.user.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {post.user.level}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.timestamp}</span>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs">
                            {post.user.badge}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-3">
                    <p className="text-foreground leading-relaxed">{post.content}</p>
                    
                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interaction Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center gap-2 ${post.liked ? 'text-red-400' : 'text-muted-foreground'}`}
                      >
                        <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(post.id)}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Share2 className="w-4 h-4" />
                        <span>{post.shares}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Study Groups */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-golden" />
              Study Groups
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {studyGroups.map((group) => (
              <div key={group.id} className="p-3 rounded-lg bg-accent/5 border border-accent/10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground text-sm">{group.name}</h3>
                    <Badge variant="outline" className={`text-xs ${
                      group.activity === 'Very Active' ? 'text-emerald-400 border-emerald-500/50' :
                      group.activity === 'Active' ? 'text-yellow-400 border-yellow-500/50' :
                      'text-gray-400 border-gray-500/50'
                    }`}>
                      {group.activity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{group.members} members</span>
                    {group.joined ? (
                      <Badge variant="secondary" className="text-xs">
                        Joined
                      </Badge>
                    ) : (
                      <Button
                        onClick={() => handleJoinGroup(group.id)}
                        size="sm"
                        variant="outline"
                        className="h-6 text-xs"
                      >
                        <UserPlus className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Learners */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Active Learners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'Rahul Kumar', status: 'Coding in Python', online: true },
              { name: 'Sneha Agarwal', status: 'Learning React', online: true },
              { name: 'Vikram Singh', status: 'Practicing algorithms', online: false },
              { name: 'Ananya Joshi', status: 'JavaScript deep dive', online: true }
            ].map((user, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {user.online && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialFeatures;