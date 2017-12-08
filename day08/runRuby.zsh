#/bin/zsh

# Usage:
# ./runRuby.zsh input.txt

{
    filename=$1;

    awk '{print $1" = 0"}' < $filename;
    awk '{print $5" = 0"}' < $filename;

    echo globalMax = -1.0/0.0;
    echo endMax = -1.0/0.0;

    sed 's/inc/+=/g' < $filename | sed 's/dec/-=/g' | awk '{print $0"\nglobalMax = "$1" if "$1" > globalMax"}';

    awk '{print "endMax = "$1" if "$1" > endMax"}' < $filename;

    echo puts endMax;
    echo puts globalMax;
} | ruby
