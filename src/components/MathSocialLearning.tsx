import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageCircle, 
  Trophy, 
  Star,
  Target,
  Heart,
  Sparkles,
  PlayCircle,
  UserPlus
} from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  grade: number;
  points: number;
  isOnline: boolean;
  currentStreak: number;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  grade: number;
  memberCount: number;
  maxMembers: number;
  isJoined: boolean;
}

const MathSocialLearning = () => {
  const [activeTab, setActiveTab] = useState('friends');

  const friends: Friend[] = [
    { id: 'f-1', name: 'Ananya Sharma', avatar: '👧', grade: 6, points: 3240, isOnline: true, currentStreak: 12 },
    { id: 'f-2', name: 'Rohan Gupta', avatar: '👦', grade: 7, points: 4567, isOnline: true, currentStreak: 8 },
    { id: 'f-3', name: 'Sneha Patel', avatar: '👩', grade: 8, points: 3890, isOnline: false, currentStreak: 15 }
  ];

  const studyGroups: StudyGroup[] = [
    { id: 'sg-1', name: 'Fraction Masters', description: 'Daily fraction practice', grade: 6, memberCount: 12, maxMembers: 15, isJoined: true },
    { id: 'sg-2', name: 'Algebra Achievers', description: 'Advanced problem solving', grade: 7, memberCount: 8, maxMembers: 12, isJoined: false },
    { id: 'sg-3', name: 'Geometry Geniuses', description: 'Shapes and proofs', grade: 8, memberCount: 15, maxMembers: 20, isJoined: true }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Users className="w-8 h-8 text-purple-400" />
            Social Learning Hub
            <Sparkles className="w-6 h-6 text-golden animate-pulse" />
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Learn together, compete, and achieve more with your peers!
          </p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{friends.length}</div>
            <div className="text-sm text-muted-foreground">Friends</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 text-golden mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">5th</div>
            <div className="text-sm text-muted-foreground">Rank</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">3</div>
            <div className="text-sm text-muted-foreground">Challenges</div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 text-center">
            <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">2</div>
            <div className="text-sm text-muted-foreground">Groups</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Friends
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Groups
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="friends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {friends.map((friend) => (
              <Card key={friend.id} className="bg-card/50 backdrop-blur-sm border-border/50 hover:scale-105 transition-transform">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <span className="text-3xl">{friend.avatar}</span>
                          {friend.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{friend.name}</h3>
                          <p className="text-sm text-muted-foreground">Class {friend.grade}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Points</div>
                        <div className="font-semibold text-golden">{friend.points.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Streak</div>
                        <div className="font-semibold text-orange-400">{friend.currentStreak} days</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        <Target className="w-4 h-4 mr-2" />
                        Challenge
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-card/30 backdrop-blur-sm border-dashed border-2 border-border/50 hover:scale-105 transition-transform">
              <CardContent className="p-6 text-center">
                <UserPlus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Add New Friends</h3>
                <p className="text-sm text-muted-foreground mb-4">Connect with classmates!</p>
                <Button variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Find Friends
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {studyGroups.map((group) => (
              <Card key={group.id} className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground">{group.name}</h3>
                        <p className="text-sm text-muted-foreground">{group.description}</p>
                      </div>
                      {group.isJoined && (
                        <Badge className="bg-green-500/20 text-green-400">Joined</Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Grade</div>
                        <div className="font-semibold text-blue-400">Class {group.grade}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Members</div>
                        <div className="font-semibold text-green-400">{group.memberCount}/{group.maxMembers}</div>
                      </div>
                    </div>

                    <Button className="w-full" variant={group.isJoined ? "outline" : "default"}>
                      {group.isJoined ? (
                        <><MessageCircle className="w-4 h-4 mr-2" />Open Group</>
                      ) : (
                        <><UserPlus className="w-4 h-4 mr-2" />Join Group</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-golden" />
                Class Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Aarav Kumar', points: 8745, isUser: false },
                  { rank: 2, name: 'Diya Patel', points: 8234, isUser: false },
                  { rank: 3, name: 'Arjun Singh', points: 7987, isUser: false },
                  { rank: 4, name: 'Priya Sharma', points: 7654, isUser: false },
                  { rank: 5, name: 'You', points: 7234, isUser: true }
                ].map((entry) => (
                  <div key={entry.rank} className={`flex items-center gap-4 p-4 rounded-lg ${
                    entry.isUser ? 'bg-blue-500/10 border border-blue-500/20' : 'bg-accent/10'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      entry.rank === 1 ? 'bg-golden text-primary' :
                      entry.rank === 2 ? 'bg-gray-300 text-primary' :
                      entry.rank === 3 ? 'bg-amber-600 text-primary' :
                      'bg-accent text-accent-foreground'
                    }`}>
                      {entry.rank}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        entry.isUser ? 'text-blue-400' : 'text-foreground'
                      }`}>
                        {entry.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{entry.points.toLocaleString()} points</p>
                    </div>
                    
                    <Star className="w-5 h-5 text-golden" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MathSocialLearning;